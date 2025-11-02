export const defaultPic =
    "https://cdn.pixabay.com/photo/2014/03/24/13/49/avatar-294480_1280.png";

export const baseUrl = "http://localhost:3000";

export const apiEndpoints = {
    feed: "/user/feed",
    requests: "/user/requests",
    connections: "/user/connections",
    sendConnection: "/request/send/",
    reviewReq: "/request/review/",
    updateUser: "/profile/edit",
    profile: "/profile/view",
    signUp: "/signup",
    login: "/login",
    forgotPassword: "/profile/password",
};

export const validations = {
    firstName: {
        required: "First name is required",
        minLength: {
            value: 4,
            message: "Minimum length should be 4",
        },
        maxLength: {
            value: 50,
            message: "Maximum length can be 50",
        },
    },
    lastName: {
        required: "Last name is required",
        minLength: {
            value: 4,
            message: "Minimum length should be 4",
        },
        maxLength: {
            value: 50,
            message: "Maximum length can be 50",
        },
    },
    emailId: {
        required: "Email is required",
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email is not valid",
        },
    },
    password: {
        required: "Password is required",
        pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            message: "Password is not valid",
        },
    },
};

export const signUpInputs = [
    {
        name: "firstName",
        label: "First Name",
    },
    {
        name: "lastName",
        label: "Last Name",
    },
    {
        name: "emailId",
        label: "Email ID",
    },
    {
        name: "password",
        label: "Password",
    },
];

export const loginInputs = [
    {
        name: "emailId",
        label: "Email ID",
    },
    {
        name: "password",
        label: "Password",
    },
];
