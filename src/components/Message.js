import { jsx as _jsx } from "react/jsx-runtime";
const Message = ({ message, type }) => {
    if (!message)
        return null;
    const typeClasses = {
        success: 'bg-green-100 text-green-700 border-green-400',
        error: 'bg-red-100 text-red-700 border-red-400',
        '': '', // No specific styling if type is empty
    };
    return (_jsx("div", { className: `mt-4 p-3 rounded-md font-bold border ${typeClasses[type]}`, role: "alert", children: message }));
};
export default Message;
