import jwtDecode from "jwt-decode"; // npm i jwt-decode

const USER_SESSION = "user_session";

/**
 * checks if session exists in user local storage
 */
export const sessionExists = () => {
    const session = sessionStorage.getItem(USER_SESSION);
    if (!session) return false;
    else return !isValidSession(session);
};


/**
 * checks if session has expired or not
 */
export const isValidSession = session => {
    const accessToken = JSON.parse(session).access_token;
    const decoded = jwtDecode(accessToken);
    const expDate = new Date(decoded.exp * 1000) // multiplied by 1000 so that the argument is in milliseconds, not seconds
    const currDate = new Date()
    return currDate >= expDate;
};

/**
 * stores user session insde local storage
 */
export const saveSession = session => {
    sessionStorage.setItem(USER_SESSION, JSON.stringify(session));
};


/**
 * deletes user current session
 */
export const deleteSession = () => {
    sessionStorage.removeItem(USER_SESSION)
};

/**
 * returns current user session
 */
export const getSession = () => {
    return JSON.parse(sessionStorage.getItem(USER_SESSION))
};
