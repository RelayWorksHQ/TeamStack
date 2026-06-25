"use client";

import {
  AtSign, Check, File, Hash, MessageCircle, Paperclip, Plus,
  Search, Send, Smile, X
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PhotoAvatar } from "../../../components/DashboardMockup";
import { createHubChatTransport } from "../../../lib/hubChatTransport";
import { readHubData, writeHubData } from "../../../lib/hubDataClient";

const members = [
  { id: "azeem", crop: "azeem", name: "Azeem Khan", handle: "Azeem", role: "Owner" },
  { id: "maya", crop: "member2", name: "Maya Chen", handle: "Maya", role: "Member" },
  { id: "omar", crop: "member3", name: "Omar Ellis", handle: "Omar", role: "Admin" },
  { id: "qa", crop: "qa", name: "QA Team", handle: "QA", role: "Contractor" }
];

const initialChannels = [
  { id: "general", name: "general", detail: "Hub-wide discussion", joined: true },
  { id: "onboarding", name: "onboarding", detail: "Driver onboarding work", joined: true },
  { id: "deployment", name: "deployment", detail: "Release and monitoring", joined: true },
  { id: "testing", name: "testing", detail: "QA passes and blockers", joined: true }
];

const nowToday = (minutesAgo) => {
  const value = new Date(Date.now() - minutesAgo * 60000);
  return value.toISOString();
};

const initialMessages = {
  general: [
    { id: "g1", userId: "maya", createdAt: nowToday(66), text: "The revised onboarding screens are ready. I linked the Figma file under Driver Onboarding Flow.", attachments: [], replies: [] },
    { id: "g2", userId: "qa", createdAt: nowToday(49), text: "@Azeem we can start Android testing now. iOS is still blocked on the latest build.", attachments: [], replies: [{ id: "r1", userId: "azeem", createdAt: nowToday(42), text: "I’m packaging the iOS build now." }] },
    { id: "g3", userId: "azeem", createdAt: nowToday(39), text: "Got it. I’m uploading the iOS build and deployment notes before the 5 PM progression window.", attachments: ["Deployment checklist.pdf"], replies: [] },
    { id: "g4", userId: "omar", createdAt: nowToday(28), text: "AQD production monitoring looks stable. I’ve submitted the approval record under Proof.", attachments: [], replies: [] },
    { id: "g5", userId: "maya", createdAt: nowToday(20), text: "I’m updating the handoff notes now. @QA can you confirm the Android screenshots are final?", attachments: [], replies: [] },
    { id: "g6", userId: "qa", createdAt: nowToday(12), text: "Confirmed. Android is final and the screenshots are attached to the testing record.", attachments: ["Android final screenshots.zip"], replies: [] },
    { id: "g7", userId: "azeem", createdAt: nowToday(4), text: "Perfect. Let’s use this channel for the launch handoff through the end of today.", attachments: [], replies: [] }
  ],
  onboarding: [
    { id: "d1", userId: "maya", createdAt: nowToday(90), text: "Copy and empty states are ready for the team review.", attachments: ["Onboarding copy.docx"], replies: [] }
  ],
  deployment: [
    { id: "a1", userId: "omar", createdAt: nowToday(120), text: "Deployment monitoring is green. Waiting for final sign-off.", attachments: [], replies: [] }
  ],
  testing: [
    { id: "q1", userId: "qa", createdAt: nowToday(35), text: "Android test pass is complete. @Azeem please send the iOS build.", attachments: ["Android results.csv"], replies: [] }
  ]
};

function timestamp(value) {
  return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function MessageText({ text }) {
  const parts = text.split(/(@[A-Za-z]+)/g);
  return <>{parts.map((part, index) => part.startsWith("@") ? <span key={index} className="rounded bg-blue-50 px-1 font-bold text-brand">{part}</span> : part)}</>;
}

export default function ChatPage() {
  const [channels, setChannels] = useState(initialChannels);
  const [activeChannelId, setActiveChannelId] = useState("general");
  const [messagesByChannel, setMessagesByChannel] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [channelModal, setChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [threadMessageId, setThreadMessageId] = useState(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [hubName, setHubName] = useState("Hub");
  const transportRef = useRef(null);
  const fileRef = useRef(null);
  const endRef = useRef(null);

  const activeChannel = channels.find(channel => channel.id === activeChannelId) || channels[0];
  const messages = messagesByChannel[activeChannelId] || [];
  const threadMessage = messages.find(message => message.id === threadMessageId);
  const mentionQuery = draft.match(/@([A-Za-z]*)$/)?.[1]?.toLowerCase();
  const mentionMatches = mentionQuery !== undefined
    ? members.filter(member => member.handle.toLowerCase().startsWith(mentionQuery))
    : [];
  const canSend = Boolean(draft.trim());

  useEffect(() => {
    const loadChat = async () => {
      setHydrated(false);
      const hubResponse = await fetch("/api/hub", { cache: "no-store" }).catch(() => null);
      const hubPayload = await hubResponse?.json().catch(() => ({}));
      setHubName(hubPayload?.hub?.fullName || "Hub");
      const savedChat = await readHubData("chat", null);
      if (savedChat?.channels && savedChat?.messagesByChannel) {
        setChannels(savedChat.channels);
        setMessagesByChannel(savedChat.messagesByChannel);
        setActiveChannelId(savedChat.activeChannelId || "general");
      } else {
        setChannels(initialChannels);
        setMessagesByChannel({});
        setActiveChannelId("general");
      }
      setHydrated(true);
    };
    const onStorage = event => {
      if (event.detail?.key === "teamstack.activeHub") loadChat();
    };
    loadChat();
    window.addEventListener("teamstack:storage", onStorage);
    return () => window.removeEventListener("teamstack:storage", onStorage);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeHubData("chat", { channels, messagesByChannel, activeChannelId });
  }, [channels, messagesByChannel, activeChannelId, hydrated]);

  useEffect(() => {
    transportRef.current = createHubChatTransport(event => {
      if (event?.type === "message") {
        setMessagesByChannel(current => ({
          ...current,
          [event.channelId]: [...(current[event.channelId] || []), event.message]
        }));
      }
      if (event?.type === "channel") {
        setChannels(current => current.some(channel => channel.id === event.channel.id) ? current : [...current, event.channel]);
      }
      if (event?.type === "reply") {
        setMessagesByChannel(current => ({
          ...current,
          [event.channelId]: (current[event.channelId] || []).map(message =>
            message.id === event.messageId ? { ...message, replies: [...message.replies, event.reply] } : message
          )
        }));
      }
    });
    return () => transportRef.current?.close();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, activeChannelId]);

  const sendMessage = () => {
    const text = draft.trim();
    if (!text) return;
    const message = {
      id: `m-${Date.now()}`,
      userId: "azeem",
      createdAt: new Date().toISOString(),
      text,
      attachments,
      replies: []
    };
    setMessagesByChannel(current => ({ ...current, [activeChannelId]: [...(current[activeChannelId] || []), message] }));
    transportRef.current?.publish({ type: "message", channelId: activeChannelId, message });
    setDraft("");
    setAttachments([]);
  };

  const createChannel = () => {
    const name = newChannelName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!name || channels.some(channel => channel.id === name)) return;
    const channel = { id: name, name, detail: "Hub channel", joined: true };
    setChannels(current => [...current, channel]);
    setMessagesByChannel(current => ({ ...current, [name]: [] }));
    setActiveChannelId(name);
    setNewChannelName("");
    setChannelModal(false);
    transportRef.current?.publish({ type: "channel", channel });
  };

  const selectChannel = channelId => {
    setActiveChannelId(channelId);
    setThreadMessageId(null);
    setReplyDraft("");
  };

  const addMention = handle => {
    setDraft(current => current.replace(/@[A-Za-z]*$/, `@${handle} `));
  };

  const addFiles = event => {
    const names = Array.from(event.target.files || []).map(file => file.name);
    setAttachments(current => [...current, ...names]);
    event.target.value = "";
  };

  const sendReply = () => {
    const text = replyDraft.trim();
    if (!text || !threadMessage) return;
    const reply = { id: `r-${Date.now()}`, userId: "azeem", createdAt: new Date().toISOString(), text };
    setMessagesByChannel(current => ({
      ...current,
      [activeChannelId]: current[activeChannelId].map(message =>
        message.id === threadMessage.id ? { ...message, replies: [...message.replies, reply] } : message
      )
    }));
    transportRef.current?.publish({ type: "reply", channelId: activeChannelId, messageId: threadMessage.id, reply });
    setReplyDraft("");
  };

  return (
    <div className={`grid h-full min-h-0 overflow-hidden bg-white ${threadMessage ? "lg:grid-cols-[230px_minmax(0,1fr)_340px]" : "lg:grid-cols-[230px_minmax(0,1fr)]"}`}>
        <aside className="flex min-h-0 flex-col border-r border-line bg-[#f8fafc] p-3">
          <div className="px-2 pb-4 pt-2"><div className="flex items-center gap-2"><h1 className="text-[18px] font-bold tracking-[-.03em]">Hub Chat</h1><span className="h-2 w-2 rounded-full bg-emerald-500" /></div><p className="mt-1 text-[10px] text-muted">{hubName}</p></div>
          <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5"><Search size={14} className="text-slate-400" /><input className="w-full bg-transparent text-[11px] outline-none" placeholder="Search conversations" /></div>
          <div className="mb-2 mt-5 flex items-center justify-between px-2"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Channels</p><button onClick={() => setChannelModal(true)} aria-label="Create channel" className="grid h-7 w-7 place-items-center rounded-md hover:bg-white hover:text-brand"><Plus size={15} /></button></div>
          <div className="min-h-0 flex-1 overflow-y-auto">
          {channels.map(channel => (
            <button key={channel.id} onClick={() => selectChannel(channel.id)} className={`mb-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left ${activeChannelId === channel.id ? "bg-white text-ink shadow-card" : "text-slate-600 hover:bg-white/70"}`}>
              <Hash size={14} />
              <span className="min-w-0 flex-1"><b className="block truncate text-[11px]">{channel.name}</b><span className="block truncate text-[9px] opacity-65">{channel.detail}</span></span>
              {activeChannelId === channel.id && <Check size={12} className="text-brand" />}
            </button>
          ))}
          </div>
          <div className="mt-3 border-t border-line px-2 pt-3"><p className="text-[9px] leading-4 text-muted">Hub channels are shared. Personal work and profile remain separate.</p></div>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-col bg-white">
          <header className="flex h-[66px] shrink-0 items-center justify-between border-b border-line px-4 sm:px-6">
            <div><h2 className="text-[16px] font-bold"># {activeChannel.name}</h2><p className="mt-0.5 text-[10px] text-muted">{activeChannel.detail} · {members.length} members</p></div>
            <div className="flex items-center gap-4"><span className="hidden items-center gap-1.5 text-[10px] font-semibold text-emerald-700 sm:flex"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative h-2 w-2 rounded-full bg-emerald-500" /></span> Live hub connection</span><div className="flex -space-x-2">{members.map(member => <span key={member.id} title={`${member.name} · ${member.role}`}><PhotoAvatar crop={member.crop} size={28} /></span>)}</div></div>
          </header>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <div className="my-3 flex items-center gap-3"><div className="h-px flex-1 bg-line" /><span className="text-[10px] font-bold text-slate-400">Today</span><div className="h-px flex-1 bg-line" /></div>
            {messages.length === 0 && <div className="grid h-64 place-items-center text-center"><div><span className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand"><Hash size={18} /></span><h3 className="mt-3 text-[12px] font-bold">Start #{activeChannel.name}</h3><p className="mt-1 text-[10px] text-muted">Send the first message to everyone in this channel.</p></div></div>}
            {messages.map(message => {
              const member = members.find(item => item.id === message.userId) || members[0];
              return (
                <article key={message.id} className="group -mx-2 flex gap-3.5 rounded-lg px-3 py-2.5 hover:bg-slate-50">
                  <PhotoAvatar crop={member.crop} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2"><b className="text-[13px]">{member.name}</b><span className="text-[10px] text-muted">{timestamp(message.createdAt)}</span></div>
                    <p className="mt-1 text-[13px] leading-[1.55] text-slate-700"><MessageText text={message.text} /></p>
                    {message.attachments.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{message.attachments.map(name => <span key={name} className="flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2.5 text-[10px] font-semibold shadow-sm"><File size={14} className="text-brand" />{name}</span>)}</div>}
                    <div className="mt-2 flex items-center gap-3">
                      <button onClick={() => setThreadMessageId(message.id)} className="flex items-center gap-1.5 text-[10px] font-bold text-brand"><MessageCircle size={13} />Reply in thread</button>
                      {message.replies.length > 0 && <button onClick={() => setThreadMessageId(message.id)} className="text-[9px] font-semibold text-muted">{message.replies.length} {message.replies.length === 1 ? "reply" : "replies"}</button>}
                    </div>
                  </div>
                </article>
              );
            })}
            <div ref={endRef} />
          </div>
          <div className="relative shrink-0 border-t border-line bg-white px-4 pb-4 pt-2 sm:px-6">
            <div className="mb-2 flex items-center gap-2 text-[10px] text-muted"><span className="flex gap-0.5"><span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-.3s]" /><span className="h-1 w-1 animate-bounce rounded-full bg-slate-400 [animation-delay:-.15s]" /><span className="h-1 w-1 animate-bounce rounded-full bg-slate-400" /></span>Maya is typing…</div>
            {mentionMatches.length > 0 && <div className="absolute bottom-[118px] left-6 w-60 rounded-xl border border-line bg-white p-2 shadow-soft">{mentionMatches.map(member => <button key={member.id} onClick={() => addMention(member.handle)} className="flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-blue-50"><PhotoAvatar crop={member.crop} size={24} /><span><b className="block text-[10px]">{member.name}</b><span className="text-[9px] text-muted">@{member.handle}</span></span></button>)}</div>}
            {attachments.length > 0 && <div className="mb-2 flex flex-wrap gap-2">{attachments.map(name => <span key={name} className="flex items-center gap-1.5 rounded-lg border border-line bg-[#fbfcfe] px-2 py-1.5 text-[8px]"><Paperclip size={10} />{name}<button onClick={() => setAttachments(current => current.filter(item => item !== name))}><X size={10} /></button></span>)}</div>}
            <div className="rounded-xl border border-slate-300 bg-white p-3 shadow-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-blue-50">
              <textarea value={draft} onChange={event => setDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} aria-label="Message Hub Chat" rows="2" placeholder={`Message #${activeChannel.name} or @mention a teammate...`} className="w-full resize-none text-[13px] leading-5 outline-none" />
              <div className="mt-2 flex items-center justify-between"><div className="flex gap-4 text-slate-400"><button onClick={() => fileRef.current?.click()} aria-label="Attach files"><Paperclip size={17} /></button><button onClick={() => setDraft(current => `${current}🙂 `)} aria-label="Add emoji"><Smile size={17} /></button><button onClick={() => setDraft(current => `${current}@`)} aria-label="Mention teammate"><AtSign size={17} /></button><input ref={fileRef} type="file" multiple className="hidden" onChange={addFiles} /></div><div className="flex items-center gap-3"><span className="hidden text-[9px] text-muted sm:block">Enter to send · Shift + Enter for new line</span><button onClick={sendMessage} disabled={!canSend} aria-label="Send message" className="grid h-9 w-9 place-items-center rounded-lg bg-ink text-white disabled:cursor-not-allowed disabled:opacity-30"><Send size={15} /></button></div></div>
            </div>
          </div>
        </section>

        {threadMessage ? (
          <aside className="flex min-h-0 min-w-0 flex-col border-l border-line bg-[#fbfcfe]">
            <header className="flex h-[66px] shrink-0 items-center justify-between border-b border-line px-5"><div><h3 className="text-[14px] font-bold">Thread</h3><p className="text-[9px] text-muted">#{activeChannel.name}</p></div><button onClick={() => setThreadMessageId(null)} aria-label="Close thread"><X size={17} /></button></header>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="rounded-lg bg-white p-4 shadow-card"><div className="flex items-center gap-2"><PhotoAvatar crop={(members.find(item => item.id === threadMessage.userId) || members[0]).crop} size={28} /><div><b className="block text-[11px]">{(members.find(item => item.id === threadMessage.userId) || members[0]).name}</b><span className="text-[9px] text-muted">{timestamp(threadMessage.createdAt)}</span></div></div><p className="mt-3 text-[12px] leading-5 text-slate-700"><MessageText text={threadMessage.text} /></p></div>
              <p className="my-4 text-[9px] font-bold uppercase tracking-widest text-slate-400">{threadMessage.replies.length} replies</p>
              <div className="space-y-5">{threadMessage.replies.map(reply => { const member = members.find(item => item.id === reply.userId) || members[0]; return <div key={reply.id} className="flex gap-3"><PhotoAvatar crop={member.crop} size={28} /><div className="min-w-0 flex-1"><div className="flex justify-between"><b className="text-[11px]">{member.name}</b><span className="text-[9px] text-muted">{timestamp(reply.createdAt)}</span></div><p className="mt-1 text-[11px] leading-5 text-muted"><MessageText text={reply.text} /></p></div></div>; })}</div>
            </div>
            <div className="border-t border-line p-3"><div className="rounded-lg border border-line bg-white p-2.5"><textarea value={replyDraft} onChange={event => setReplyDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendReply(); } }} rows="2" className="w-full resize-none text-[10px] outline-none" placeholder="Reply to thread..." /><div className="mt-2 flex justify-end"><button onClick={sendReply} disabled={!replyDraft.trim()} className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-white disabled:opacity-30"><Send size={12} /></button></div></div></div>
          </aside>
        ) : null}

      {channelModal && <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/30 p-5 backdrop-blur-sm"><div className="w-full max-w-sm rounded-2xl border border-line bg-white p-6 shadow-soft"><div className="flex justify-between"><div><h2 className="text-[15px] font-bold">Create a Hub channel</h2><p className="mt-1 text-[10px] text-muted">Channels are shared with members of this Hub.</p></div><button onClick={() => setChannelModal(false)} aria-label="Close channel dialog"><X size={17} /></button></div><label className="mt-5 block text-[10px] font-bold">Channel name<input autoFocus value={newChannelName} onChange={event => setNewChannelName(event.target.value)} onKeyDown={event => event.key === "Enter" && createChannel()} placeholder="example: launch-planning" className="mt-2 w-full rounded-lg border border-line px-3 py-3 text-[11px] outline-none focus:border-brand" /></label><button onClick={createChannel} disabled={!newChannelName.trim()} className="mt-4 w-full rounded-lg bg-ink py-3 text-[11px] font-bold text-white disabled:opacity-30">Create and join channel</button></div></div>}
    </div>
  );
}
