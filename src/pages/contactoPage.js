import React, { useRef } from "react";
import Header from '../componets/header';
import Footer from '../componets/footer';
import '../index.css'
import toast, { Toaster } from 'react-hot-toast';
import emailjs from 'emailjs-com'

import NotRealPage from "../componets/NotRealPage";



const ContactoPage = (props) => {
    const form = useRef();

    window.scrollTo(0, 0);
    const comprobarEstado = () => {
        if (form.current.user_name.value !== '' && form.current.subject.value !== '' && form.current.user_email.value !== '' && form.current.message.value !== '') {
            return true
        } else {
            return false

        }
    }

    const SubmitContacto = async (event) => {
        event.preventDefault();

        const ToastLoading = toast.loading('Loading...');


        const Enviar = comprobarEstado()

        if (Enviar === true) {

            emailjs.sendForm(
                process.env.REACT_APP_SERVICE,
                process.env.REACT_APP_TEMPLATE,
                form.current,
                process.env.REACT_APP_APIPUBLIC
            ).then((result) => {
                toast.dismiss(ToastLoading);
                toast.success('El mensaje fue enviado');
                console.log(result.text);
            }, (error) => {
                toast.dismiss(ToastLoading);
                toast.error('Error');
                console.log(error.text);
            });

            form.current.user_name.value = ''
            form.current.subject.value = ''
            form.current.user_email.value = ''
            form.current.message.value = ''
        } else {
            toast.dismiss(ToastLoading);
            toast.error('Complete todos los campos');
            console.log('no enviar')
        }


    }

    return (
        <>
            <Header />
            <main className='mainContacto'>
                <img src='img/contactoimg.webp' alt='Imagen decorativa' className='imgContacto'></img>
                <div className='conteinerFormContacto'>
                    <div className='tituloContacto'>Contáctate</div>
                    <form className='FormContacto' onSubmit={SubmitContacto} ref={form}>
                        <input type={'hidden'} value='WeTrust' name="page_name"></input>
                        <input type={'text'} placeholder={'Nombre'} name='user_name'></input>
                        <input type={'text'} placeholder={'Email'} name='user_email'></input>
                        <input type={'text'} placeholder={'Asusntos'} name='subject'></input>
                        <textarea placeholder={'Mensaje'} name='message'></textarea>
                        <input type={'submit'} value="Enviar" ></input>
                        <NotRealPage />

                    </form>
                </div>
            </main>
            <Toaster />

            <Footer />
        </>


    );
}
export default ContactoPage;