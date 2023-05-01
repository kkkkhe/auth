import {Link} from "atomic-router-react";
import {signinRouter, signupRouter} from "@/shared/router/routes";
import {useUnit} from "effector-react";
import {
    $email,
    $name,
    $password,
    emailChanged,
    nameChanged,
    passwordChanged,
    submitTriggered
} from "@/pages/Signup/signup.model";
import {Input} from "@/shared/ui/input";
import {FormEvent, FormEventHandler} from "react";

const handleSubmit = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitTriggered()
};

export const SignupPage = () => {
    const [nameValue, emailValue, passwordValue] = useUnit([$name, $email, $password])
    return (
        <div className={'w-full h-screen flex items-center justify-center'}>
            <div className={'bg-[#A6D0DD] p-5 w-full max-w-[400px] rounded-[5px]'}>
                <div className={'flex justify-between mb-5'}>
                    <div>Signup</div>
                        <Link to={signupRouter.homeRoute}>
                            home
                        </Link>
                </div>
                <form className={'flex flex-col gap-2 w-full'} action="" onSubmit={handleSubmit}>
                    <Input value={nameValue} action={nameChanged} placeholder={'name'}/>
                    <Input value={emailValue} action={emailChanged} placeholder={'email'}/>
                    <Input value={passwordValue} action={passwordChanged} placeholder={'password'}/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}