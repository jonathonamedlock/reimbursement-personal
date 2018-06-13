const session = {
    role: '',
    selected: '',
    username: '',
}

const SessionState = {
    financial: 'financial',
    get: () => session,
    set: (item) => {
        session.role = item.role;
        session.username = item.username;
    },
    setSelect: (item) => {
        session.selected = item;
    },
    user: 'user',
}

Object.freeze(SessionState);

export default SessionState;