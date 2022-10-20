export const attachGroups = (initialDatas, phases) => {
  const groups = phases.reduce((pre, phase) => {
    pre[phase.num] = [];
    return pre;
  }, {});
  for (let todo of initialDatas) {
    groups[todo.phase].push({ ...todo });
    groups[todo.phase].sort((a, b) => a.updated - b.updated);
  }
  return { data: initialDatas, ...groups };
};

export const setStatus = (state, status) => ({ ...state, status });
