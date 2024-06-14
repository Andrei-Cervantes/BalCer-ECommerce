import { Link } from 'react-router-dom';

export default function Homepage({data}) {

    // console.log(data);
    const {title, content, destination, label} = data;

    return (
        <div className='text-light with-background-image'>
            <div className="p-5 text-center">
                <h1>{title}</h1>
                <p>{content}</p>
                <Link className="btn btn-primary" to={destination}>{label}</Link>
            </div>
        </div>
    )
}