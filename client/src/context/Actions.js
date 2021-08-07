export const loginStart = (credentials) =>({

    type: "LOGIN_START"
});

export const loginSuccess = (user)=>({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const loginFail = ()=>({
    type: "LOGIN_FAILED"
});

export const Logout = ()=>({
    type: "LOGOUT"
})

//For Update process
export const updateStart = (credentials) =>({

    type: "UPDATE_START"
});

export const updateSuccess = (user)=>({
    type: "UPDATE_SUCCESS",
    payload: user
});

export const updateFail = ()=>({
    type: "UPDATE_FAILED"
});
