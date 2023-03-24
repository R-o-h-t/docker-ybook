import { Button, Paper, PasswordInput, TextInput, Title, Text, Anchor, Modal } from "@mantine/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthHook";
import { useStyles } from "../../hooks/styleMantine/loginStyle";

export const LoginView: React.FC = () => {
    const {classes} = useStyles();
    const { login } = useAuth();
    const { confirmationRegister }  = useAuth();
    const { resendConfirmationCode } = useAuth();
    const [error, setError] = React.useState<string>('');
    const [showModalReSend, setShowModalReSend] = React.useState<boolean>(false);
    const navigate = useNavigate();
    const [confirmationRegisterValue, setConfirmationRegisterValue] = React.useState('');


    const codeLogin = React.createRef<HTMLInputElement>();
    const formLogin = {
        email: React.createRef<HTMLInputElement>(),
        password: React.createRef<HTMLInputElement>()
    }

    const handleFakeLogin = () => {
        navigate('/home');
    }

    const callbackValidation = () => {
        const code = codeLogin.current?.value as string;
        if (code === '') {
            return;
        }else{
            confirmationRegister(code, setConfirmationRegisterValue);
            codeLogin.current!.value = '';
        }
    }

    useEffect(() => {
        if(error){
            if(error === 'UserNotConfirmedException'){
                resendConfirmationCode();
                setShowModalReSend(true);
            }
        }
    }, [error])

    useEffect(() => {
        if(confirmationRegisterValue !== ''){
            setShowModalReSend(false);
        }
    }, [confirmationRegisterValue])

    const handleSubmit = () => {
        const emailValue = formLogin.email.current?.value as string;
        const passwordValue = formLogin.password.current?.value as string;
        login(emailValue, passwordValue,setError);
    }       

    return (
        <>
            <div className={classes.wrapper}>
                <Paper className={classes.form} radius={0} p={30}>
                    <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                        Bienvenue sur Ybook !
                    </Title>

                    <TextInput ref={formLogin.email} label="Adresse e-mail" placeholder="hello@gmail.com" size="md" />
                    <PasswordInput ref={formLogin.password} label="Mot de passe" placeholder="Votre mot de passe" mt="md" size="md" />
                    <Button onClick={handleSubmit} fullWidth mt="xl" size="md">
                        Se connecter
                    </Button>

                    <Text align="center" mt="md">
                        Pas encore de compte ?{' '}
                        <Anchor<'a'> href="#" weight={700} onClick={(event) => {navigate('/register')}}>
                            S'inscrire
                        </Anchor>
                    </Text>
                    <Text align="center" mt="md">
                        Passer outre Cognito et testez l'application dès maintenant : {' '}
                        <Anchor<'a'> href="#" weight={700} onClick={handleFakeLogin}>
                            Par ici
                        </Anchor>
                    </Text>
                </Paper>
            </div>
            <Modal 
                opened={showModalReSend}
                onClose={() => setShowModalReSend(false)}
                title="En attente de confirmation"
                size="md"
            >
                <Text>
                    Un code de confirmation vous a été envoyé. Veuillez cliquer sur le lien pour confirmer votre compte.
                </Text>
                <TextInput ref={codeLogin} label="Code de confirmation" placeholder="Code de confirmation" size="md" />
                <Button onClick={callbackValidation} fullWidth mt="xl" size="md">Envoyer</Button>
            </Modal>
        </>
    );
}
