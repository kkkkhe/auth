import {nameChanged} from "@/pages/Signup/signup.model";

export const Input = ({value, action, placeholder}:{value: string, action: (t: string) => void, placeholder: string}) => {
    return (
        <input className={'border-[1px] outline-none'} placeholder={placeholder} type="text" value={value} onChange={(e) => action(e.target.value)}/>
)
}