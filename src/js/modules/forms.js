const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]')

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '')
        })
    })

    const message = {
        loading: "Télécharger...",
        success: "Nous serons bientôt en contact avec vous !",
        failer: "Quelque chose n'a pas fonctionné :("
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading
        let res = await fetch(url, {
            method: 'POST',
            body: data
        })
        return await res.text()
    }

    const clearInputs = () => {
        inputs.forEach(item => item.value = '')
    }

    form.forEach(item => item.addEventListener('submit', (e) => {
        e.preventDefault()

        let statusMessage = document.createElement('div')
        statusMessage.classList.add('status')
        item.appendChild(statusMessage)

        const formData = new FormData(item);

        postData('assets/server.php', formData)
            .then(res => {
                console.log(res)
                statusMessage.textContent = message.success
            })
            .catch(() => statusMessage.textContent = message.failer)
            .finally(() => {
                clearInputs()
                setTimeout(() => {
                    statusMessage.remove()
                }, 5000)
            })
    }))
};

export default forms;