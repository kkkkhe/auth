import {nameChanged} from "@/pages/Signup/signup.model";

export const Input = ({value, action, placeholder}:{value: string, action: (t: string) => void, placeholder: string}) => {
    return (
        <input className={'border-[1px] border-white px-2 py-1 outline-none bg-transparent'} placeholder={placeholder} type="text" value={value} onChange={(e) => action(e.target.value)}/>
)
}