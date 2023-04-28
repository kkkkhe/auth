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
        <div className={'w-full h-screen flex flex-col items-center justify-center'}>
            <div>Signin Page</div>
            <Link to={signinRouter.homeRoute}>go to home page</Link>
            <form className={'flex flex-col gap-2 max-w-[400px] w-full'} action="" onSubmit={handleSubmit}>
                <Input value={emailValue} action={emailChanged} placeholder={'email'}/>
                <Input value={passwordValue} action={passwordChanged} placeholder={'password'}/>
                <button>Submit</button>
            </form>
        </div>
    )
}