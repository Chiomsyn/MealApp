import logoImg from '../../assests/logo.png'
import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
                <img src={logoImg} alt="/" className="h-14 w-14"/>
            </div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                {heading}
            </h2>
            <p className='mt-2 text-center text-xl  font-extrabold text-gray-900'>
                {paragraph} {''}
                <Link to={linkUrl} className="font-medium text-slate-900 hover:text-slate-300">
                {linkName}
            </Link>
            </p>
        </div>
    );
}