const addAction = (req, res) => {
    const defaultParams = { pageTitle: "Добавить трек" };
    return req.query.error ? { message: "Ошибка сервера. Попробуйте позже" } : { message: null };
};

export { addAction };