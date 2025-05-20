import react from 'react';
import { AiOutlineWechatWork } from "react-icons/ai";
const ChatButton = () => {
    return (
        <div className="fixed bottom-8 right-12">
        <button className="bg-blue-500 text-white text-2xl rounded-full p-3 shadow-lg hover:cursor-pointer hover:bg-blue-600 transition duration-300">
            <AiOutlineWechatWork size={48} />
        </button>
        </div>
    );
}
export default ChatButton;