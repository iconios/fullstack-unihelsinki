import Header from './Header.jsx';
import Content from './Content.jsx';
import Total from './Total.jsx';
import { v4 as uuidv4 } from 'uuid';

export default function Course({ courses }) {
    console.log('Length of courses', courses.length);

        return (  
            <> 
                { courses.map(course => (
                    <>
                        <Header key={uuidv4()} head={course.name} />
                        <Content key={uuidv4()} parts={course.parts} />
                        <Total key={uuidv4()} exercises={course.parts} />
                    </>
                ))}
            </>
        )
}
        
