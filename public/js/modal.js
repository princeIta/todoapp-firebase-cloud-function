function modal({ modalId, onDismiss = () => { }, onOk = () => { } }) {
    const modalTemplate = document.getElementById(modalId)

    const modalBackdrop = modalTemplate.querySelector(".modal__backdrop")
    const modalBody = modalTemplate.querySelector(".modal__body")

    const close = () => {
        modalTemplate.classList.add("modal--hidden")
        modalBackdrop.classList.add("modal__backdrop--hidden")
        modalBody.classList.add("modal__body--hidden")
    }
    const open = () => {
        modalTemplate.classList.remove("modal--hidden")
        modalBackdrop.classList.remove("modal__backdrop--hidden")
        modalBody.classList.remove("modal__body--hidden")
    }
    const remove = () => {
        modalTemplate.remove()
    }
    const getInstance = () => {
        return modalTemplate
    }

    window.onclick = e => {
        if (e.target == modalBackdrop) {
            close()
        }
    }

    return {
        open,
        close,
        remove,
        getInstance
    }
}