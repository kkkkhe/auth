import {Link} from "atomic-router-react";
import {signupRouter} from "@/shared/router/routes";
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
        <div className={'flex flex-col w-full items-center justify-center h-screen'}>
            <div>Signup page</div>
                <Link to={signupRouter.homeRoute}>
                    go to home page
                </Link>
            <form className={'flex flex-col gap-2 max-w-[400px] w-full'} action="" onSubmit={handleSubmit}>
                <Input value={nameValue} action={nameChanged} placeholder={'name'}/>
                <Input value={emailValue} action={emailChanged} placeholder={'email'}/>
                <Input value={passwordValue} action={passwordChanged} placeholder={'password'}/>
                <button>Submit</button>
            </form>
        </div>
    )
}