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
    forgotPassword: "/password",
    logout: "/logout",
    payment: "/payment/create-checkout-session",
    chats: "/chat"
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
            message: "Minimum length should have 4 characters",
        },
        maxLength: {
            value: 50,
            message: "Maximum length can have 50 characters",
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
    gender: {
        validate: (gender) => {
            if(!["Male", "Female"].includes(gender)) return "Gender can be Male or Female";
        } 
    },
    about: {
        minLength: {
            value: 20,
            message: "Minimum length should be 20 characters",
        },
        maxLength: {
            value: 100,
            message: "Maximum length can have 100 characters",
        }
    }
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

export const profileInputs = [
    {
        name: "firstName",
        label: "First Name",
    },
    {
        name: "lastName",
        label: "Last Name",
    },
    {
        name: "gender",
        label: "Gender",
    },
    {
        name: "photoUrl",
        label: "Photo URL",
    },
    {
        name: "about",
        label: "About",
    },
];

export const menuOptions = [
    {
        label: "Profile",
        href: "/profile"
    },
    {
        label: "Feed",
        href: "/"
    },
    {
        label: "Connections",
        href: "/connections"
    },
    {
        label: "Requests",
        href: "/requests"
    },
    {
        label: "Premium",
        href: "/premium"
    },
];

export const packages = [
    {
        packageName: "silver",
        price: 399,
        features: [
            "Unlimited chats",
            "100 requests per day",
            "Silver tick",
            "3 months"
        ]
    },
    {
        packageName: "gold",
        price: 599,
        features: [
            "Unlimited chats",
            "Unlimited requests per day",
            "Gold tick",
            "6 months"
        ]
    },
];