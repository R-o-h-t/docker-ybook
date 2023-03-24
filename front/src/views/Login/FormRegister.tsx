import { Anchor, Button, Paper, PasswordInput, TextInput, Title, Text, Modal } from '@mantine/core';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthHook';
import { useStyles } from '../../hooks/styleMantine/loginStyle';

const FormRegister: React.FC = () => {
    const [showModaConfirmation, setShowModalConfirmation] = useState(false);
    const [validationOk, setValidationOk] = useState<boolean>(false);
    const [confirmationRegisterValue, setConfirmationRegisterValue] = useState('');
    const { confirmationRegister } = useAuth();
    const { resendConfirmationCode } = useAuth();
    const { register } = useAuth();
    const navigate  = useNavigate();
    const { classes } = useStyles();
    
    const codeValidation = React.createRef<HTMLInputElement>();

    const callbackResend = () => {
            resendConfirmationCode();
    }

    const callbackValidation = () => {
        const code = codeValidation.current?.value as string;
        if (code === '') {
            return;
        }else{
            confirmationRegister(code, setConfirmationRegisterValue);
            // codeValidation.current!.value = '';
        }
    }

    useEffect(() => {
        if(confirmationRegisterValue !== ''){
            setShowModalConfirmation(false);
            codeValidation.current!.value = '';
        }
    }, [confirmationRegisterValue])
    
    useEffect(() => {
        if(validationOk){
            setShowModalConfirmation(true);
        }
    },[validationOk])


    // make table of refs for form 
    const formRegister = {
        email: React.createRef<HTMLInputElement>(),
        firstName: React.createRef<HTMLInputElement>(),
        lastName: React.createRef<HTMLInputElement>(),
        password: React.createRef<HTMLInputElement>()
    };

    // attributeList type is CognitoUserAttribute[]
    const attributeList : AmazonCognitoIdentity.CognitoUserAttribute[]  = [];

    const dataEmail = {
        Name: 'email',
        Value: ''
    };

    const dataFirstName = {
        Name: 'given_name',
        Value: ''
    };

    const dataLastName = {
        Name: 'name',
        Value: ''
    };


    const handleSubmit = () => {
        dataEmail.Value = formRegister.email.current?.value as string;
        dataFirstName.Value = formRegister.firstName.current?.value as string;
        dataLastName.Value = formRegister.lastName.current?.value as string;
        
        const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        const attributeFirstName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFirstName);
        const attributeLastName = new AmazonCognitoIdentity.CognitoUserAttribute(dataLastName);

        attributeList.push(attributeEmail);
        attributeList.push(attributeFirstName);
        attributeList.push(attributeLastName);

        try {
            register(formRegister.email.current?.value as string, formRegister.password.current?.value as string, attributeList, setValidationOk)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>  
            <div className={classes.wrapper}>
                <Paper className={classes.form} radius={0} p={30}>
                    <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                        Inscription Ybook
                    </Title>

                    <TextInput ref={formRegister.email} label="Adresse e-mail" placeholder="hello@gmail.com" size="md" />
                    <TextInput ref={formRegister.firstName} label="Prénom" placeholder="Prénom :" mt="md" size="md" />
                    <TextInput ref={formRegister.lastName} label="Nom" placeholder="Nom :" mt="md" size="md" />
                    <PasswordInput ref={formRegister.password} label="Mot de passe" placeholder="Mot de passe" mt="md" size="md" />
                    <Button onClick={handleSubmit} fullWidth mt="xl" size="md">
                        S'inscrire
                    </Button>

                    <Text align="center" mt="md">
                        Vous avez déjà un compte ?{' '}
                        <Anchor<'a'> href="#" weight={700} onClick={(event) => {navigate('/login')}}>
                            Se connecter
                        </Anchor>
                    </Text>
                </Paper>
            </div>
            <Modal 
                opened={showModaConfirmation}
                onClose={() => setShowModalConfirmation(false)}
                title="En attente de confirmation"
                size="md"
            >
                <Text>
                    Un code de confirmation vous a été envoyé. Veuillez cliquer sur le lien pour confirmer votre compte.
                </Text>
                <TextInput ref={codeValidation} label="Code de confirmation" placeholder="Code de confirmation" size="md" />
                <Button onClick={callbackResend} fullWidth mt="xl" size="md">Envoyer à nouveau</Button>
                <Button onClick={callbackValidation} fullWidth mt="xl" size="md">Envoyer</Button>
            </Modal>
        </>
    );
}

export default FormRegister
