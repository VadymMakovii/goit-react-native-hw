import { Alert } from "react-native";

export const useAlert = (error) => {
    const message = () => {
        if (error.includes("invalid-email")) {
            return "Invalid email address. The email address should be, for example: exemple@mail.com. Please try again!";
        } else if (error.includes("email-already-in-use")) {
            return "The email address is already in use, please sign in or use a new email address!";
        } else if (error.includes("weak-password")) {
            return "Password should be at least 6 characters, please try again!";
        } else if (error.includes("internal-error")) {
            return "Please fill in all fields and try again!";
        } else if (error.includes("user-not-found")) {
            return "User not found, log in or use another email address!";
        } else if (error.includes("wrong-password")) {
            return "Wrong password, please try again!";
        } else return `${error}`;
    };

  Alert.alert('Something went wrong', `${message()}`, [
      {text: 'OK'},
    ]);
};
