import startUp from "./startUp";

let port = process.env.PORT || '3030';

startUp.app.listen(port, function () {
    console.log(`servidor executando na porta ${port}`);
})