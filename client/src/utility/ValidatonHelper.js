class ValidationHelper {

    static IsLater(value) {
        let OnlyLaterRegx = /^[A-Za-z'\s.,\-!@#$%^&*()[\]{};:"<>?/+=_\\|`~]+$/
        return OnlyLaterRegx.test(value);
    }
    static IsEmail(value) {
        let EmailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return EmailRegx.test(value);
    }
    static IsMobile(value) {
        let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
        return MobileRegx.test(value);
    }
    static IsNumber(value) {
        let OnlyNumberRegx = /^\d+(\.\d+)?$/;
        return OnlyNumberRegx.test(value);
    }
    static IsNull(value) {
        return value == null;
    }
    static IsEmpty(value) {
        return value.length === 0;
    }
}

export default ValidationHelper;