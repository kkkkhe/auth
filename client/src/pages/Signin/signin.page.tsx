import {Link} from "atomic-router-react";
import {signinRouter} from "@/shared/router/routes";
import {Input} from "@/shared/ui/input";
import {FormEvent} from "react";
import {$form, emailChanged, passwordChanged, submitTriggered} from "@/pages/Signin/signin.model";
import {useUnit} from "effector-react";

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submitTriggered()
}

export const SigninPage = () => {
        const [emailValue, passwordValue] = useUnit($form)
    return (
        <div className={'w-full h-screen flex items-center justify-center'}>
            <div className={'bg-[#A6D0DD] p-5 w-full max-w-[400px] rounded-[5px]'}>
                <div className={'flex justify-between mb-5'}>
                    <div>Signin</div>
                    <Link to={signinRouter.homeRoute}>home</Link>
                </div>
                <form className={'flex flex-col gap-2 w-full'} action="" onSubmit={handleSubmit}>
                    <Input value={emailValue} action={emailChanged} placeholder={'email'}/>
                    <Input value={passwordValue} action={passwordChanged} placeholder={'password'}/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}