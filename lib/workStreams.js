export const WORK_STREAM_STATUSES = Object.freeze([
  "To Do",
  "In Progress",
  "Review",
  "Blocked",
  "Completed"
]);

export const WORK_STREAM_PRIORITIES = Object.freeze([
  "Low",
  "Medium",
  "High",
  "Critical"
]);

export const HUB_MEMBER_ROLES = Object.freeze({
  OWNER: "Owner",
  ADMIN: "Admin",
  MANAGER: "Manager",
  MEMBER: "Member",
  GUEST: "Guest"
});

export const WORK_ACTIVITY_TYPES = Object.freeze({
  CREATED_WORK_STREAM: "created work stream",
  ASSIGNED_TASK: "assigned task",
  COMPLETED_TASK: "completed task",
  UPLOADED_FILE: "uploaded file",
  ADDED_PROOF: "added proof",
  COMMENTED: "commented"
});

const roleRank = Object.freeze({
  [HUB_MEMBER_ROLES.OWNER]: 5,
  [HUB_MEMBER_ROLES.ADMIN]: 4,
  [HUB_MEMBER_ROLES.MANAGER]: 3,
  [HUB_MEMBER_ROLES.MEMBER]: 2,
  [HUB_MEMBER_ROLES.GUEST]: 1
});

export const demoHubMembers = Object.freeze([
  { id: "member_azeem", name: "Azeem Khan", role: HUB_MEMBER_ROLES.OWNER },
  { id: "member_maya", name: "Maya Chen", role: HUB_MEMBER_ROLES.ADMIN },
  { id: "member_omar", name: "Omar Ellis", role: HUB_MEMBER_ROLES.MANAGER },
  { id: "member_qa", name: "QA Team", role: HUB_MEMBER_ROLES.MEMBER },
  { id: "member_guest", name: "Client Viewer", role: HUB_MEMBER_ROLES.GUEST }
]);

export const demoWorkStreams = Object.freeze([
  {
    id: "work_driver_onboarding",
    hubId: "hub_launch_crew",
    name: "Driver Onboarding Flow",
    description: "Build the driver onboarding experience for the Aleet Driver Portal.",
    owner: "member_maya",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-06-24",
    members: ["member_maya", "member_omar", "member_qa"],
    files: ["file_onboarding_wireframes", "file_release_notes"],
    proofRecords: ["proof_qa_passed", "proof_deployment_approved"],
    tasks: [
      {
        id: "task_onboarding_states",
        title: "Map onboarding states",
        assignedTo: "member_azeem",
        assignedBy: "member_maya",
        owner: "member_maya",
        reviewers: ["member_qa"],
        dueDate: "2026-06-20",
        priority: "High",
        status: "Completed",
        estimatedEffort: "4h"
      },
      {
        id: "task_driver_copy",
        title: "Review driver contract copy",
        assignedTo: "member_maya",
        assignedBy: "member_maya",
        owner: "member_maya",
        reviewers: ["member_omar"],
        dueDate: "2026-06-22",
        priority: "Medium",
        status: "In Progress",
        estimatedEffort: "2h"
      },
      {
        id: "task_presence_alerts",
        title: "Test driver presence alerts",
        assignedTo: "member_qa",
        assignedBy: "member_omar",
        owner: "member_maya",
        reviewers: [],
        dueDate: "2026-06-24",
        priority: "High",
        status: "Review",
        estimatedEffort: "3h"
      }
    ],
    activity: [
      createActivityLogRecord({
        id: "activity_created_onboarding",
        workStreamId: "work_driver_onboarding",
        actorId: "member_maya",
        type: WORK_ACTIVITY_TYPES.CREATED_WORK_STREAM,
        message: "Maya Chen created Driver Onboarding Flow.",
        createdAt: "2026-06-18T14:00:00.000Z"
      }),
      createActivityLogRecord({
        id: "activity_assigned_alerts",
        workStreamId: "work_driver_onboarding",
        actorId: "member_omar",
        type: WORK_ACTIVITY_TYPES.ASSIGNED_TASK,
        message: "Omar Ellis assigned Test driver presence alerts to QA Team.",
        createdAt: "2026-06-19T16:30:00.000Z"
      }),
      createActivityLogRecord({
        id: "activity_completed_states",
        workStreamId: "work_driver_onboarding",
        actorId: "member_azeem",
        type: WORK_ACTIVITY_TYPES.COMPLETED_TASK,
        message: "Azeem Khan completed Map onboarding states.",
        createdAt: "2026-06-20T20:00:00.000Z"
      })
    ]
  },
  {
    id: "work_aqd_deployment",
    hubId: "hub_launch_crew",
    name: "AQD Deployment",
    description: "Prepare, verify, and approve the AQD production deployment.",
    owner: "member_omar",
    status: "Blocked",
    priority: "Critical",
    dueDate: "2026-06-24",
    members: ["member_omar", "member_azeem", "member_qa"],
    files: ["file_deployment_notes"],
    proofRecords: ["proof_contract_uploaded"],
    tasks: [
      {
        id: "task_aqd_fix",
        title: "Deploy AQD connection fix",
        assignedTo: "member_omar",
        assignedBy: "member_azeem",
        owner: "member_omar",
        reviewers: ["member_qa"],
        dueDate: "2026-06-21",
        priority: "Critical",
        status: "Completed",
        estimatedEffort: "5h"
      },
      {
        id: "task_aqd_validation",
        title: "Validate AQD production behavior",
        assignedTo: "member_qa",
        assignedBy: "member_omar",
        owner: "member_omar",
        reviewers: ["member_azeem"],
        dueDate: "2026-06-24",
        priority: "High",
        status: "Blocked",
        estimatedEffort: "3h"
      }
    ],
    activity: [
      createActivityLogRecord({
        id: "activity_aqd_file",
        workStreamId: "work_aqd_deployment",
        actorId: "member_azeem",
        type: WORK_ACTIVITY_TYPES.UPLOADED_FILE,
        message: "Azeem Khan uploaded Deployment Notes.",
        createdAt: "2026-06-21T17:15:00.000Z"
      }),
      createActivityLogRecord({
        id: "activity_aqd_proof",
        workStreamId: "work_aqd_deployment",
        actorId: "member_qa",
        type: WORK_ACTIVITY_TYPES.ADDED_PROOF,
        message: "QA Team added a validation proof record.",
        createdAt: "2026-06-22T12:45:00.000Z"
      }),
      createActivityLogRecord({
        id: "activity_aqd_comment",
        workStreamId: "work_aqd_deployment",
        actorId: "member_omar",
        type: WORK_ACTIVITY_TYPES.COMMENTED,
        message: "Omar Ellis commented on the blocked validation task.",
        createdAt: "2026-06-22T14:05:00.000Z"
      })
    ]
  }
]);

export function calculateWorkStreamProgress(tasks = []) {
  if (!tasks.length) return 0;

  const completedCount = tasks.filter((task) => task.status === "Completed").length;
  return Math.round((completedCount / tasks.length) * 100);
}

export function getTaskCounts(tasks = []) {
  return tasks.reduce(
    (counts, task) => ({
      ...counts,
      total: counts.total + 1,
      completed: counts.completed + (task.status === "Completed" ? 1 : 0),
      inProgress: counts.inProgress + (task.status === "In Progress" ? 1 : 0),
      review: counts.review + (task.status === "Review" ? 1 : 0),
      blocked: counts.blocked + (task.status === "Blocked" ? 1 : 0),
      toDo: counts.toDo + (task.status === "To Do" ? 1 : 0)
    }),
    { total: 0, completed: 0, inProgress: 0, review: 0, blocked: 0, toDo: 0 }
  );
}

export function canAssignWork({ actor, assignee, allowMemberAssignment = false }) {
  if (!actor || !assignee) return false;
  if (actor.role === HUB_MEMBER_ROLES.GUEST) return false;
  if (actor.role === HUB_MEMBER_ROLES.OWNER) return true;
  if (actor.role === HUB_MEMBER_ROLES.ADMIN) return assignee.role !== HUB_MEMBER_ROLES.OWNER;

  if (actor.role === HUB_MEMBER_ROLES.MANAGER) {
    return roleRank[assignee.role] < roleRank[actor.role];
  }

  if (actor.role === HUB_MEMBER_ROLES.MEMBER) {
    return actor.id === assignee.id || allowMemberAssignment;
  }

  return false;
}

export function createActivityLogRecord({
  id,
  workStreamId,
  taskId,
  actorId,
  type,
  message,
  createdAt = new Date().toISOString(),
  metadata = {}
}) {
  return {
    id,
    workStreamId,
    taskId,
    actorId,
    type,
    message,
    createdAt,
    metadata
  };
}

export function withComputedWorkStreamFields(workStream) {
  const taskCounts = getTaskCounts(workStream.tasks);

  return {
    ...workStream,
    progress: calculateWorkStreamProgress(workStream.tasks),
    taskCounts
  };
}
