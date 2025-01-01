export function swalMixin(icon, title) {
    const Toast = this.$swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = this.$swal.stopTimer;
            toast.onmouseleave = this.$swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: icon,
        title: title,
        padding: '2em',
    });
}
export function swalFire(title, text, icon) {
    return this.$swal.fire({
        title: title,
        text: text,
        icon: icon
    });
}
