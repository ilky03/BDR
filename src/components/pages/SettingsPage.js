import { useRef } from 'react';
import useDB from '../../services/useDB'

function SettingsPage() {
    const { update } = useDB();

    const nameFormRef = useRef(null);
    const bgFormRef = useRef(null);
    const balanceFormRef = useRef(null);

    const handleFormSubmit = (e, formRef) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        let data = Object.fromEntries(formData.entries());

        update('/', data);

        formRef.current.reset();
    }

    return (
        <>
            <header className="header__main">
                <h1>Налаштування користувача та інтерфейсу</h1>
            </header>

            <main className="wrapper ">
                <section className="container form form_settings">
                    <h3>Зміна імені</h3>
                    <form className="form__field" ref={nameFormRef} onSubmit={(e) => handleFormSubmit(e, nameFormRef)}>
                        <label htmlFor="profile-name">Нове ім'я</label>
                        <input id="profile-name" name="name" type="text"></input>
                        <button className="btn" type="submit">Зберегти</button>
                    </form>
                </section>

                <section className="container form form_settings">
                    <h3>Зміна тла головної сторінки</h3>
                    <form className="form__field" ref={bgFormRef} onSubmit={(e) => handleFormSubmit(e, bgFormRef)}>
                        <label htmlFor="profile-bg">Посилання на нове тло</label>
                        <input id="profile-bg" name="background" type="text"></input>
                        <button className="btn" type="submit">Зберегти</button>
                    </form>
                </section>

                <section className="container form form_settings">
                    <h3>Зміна балансу</h3>
                    <form className="form__field" ref={balanceFormRef} onSubmit={(e) => handleFormSubmit(e, balanceFormRef)}>
                        <label htmlFor="profile-balance">Нове значення балансу</label>
                        <input id="profile-balance" name="balance" type="number"></input>
                        <button className="btn" type="submit">Зберегти</button>
                    </form>
                </section>
            </main>
        </>
    )
}

export default SettingsPage;
