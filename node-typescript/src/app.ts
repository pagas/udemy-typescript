import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos';
import { json } from 'body-parser';


const app = express();
// app.get('*',function (req, res) {
//     res.json({test: 'test'});
// });
app.use(json());

app.use('/todos', todoRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);

console.log('start node and typescrip..!!')