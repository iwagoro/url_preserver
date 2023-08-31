import { create } from "domain";
import React ,{useEffect,useState} from "react";

const Greet = () => {

    const [greet, setGreet] = useState<string>('hello')

    const createGreet = () => {
        const currentHour = new Date().getHours()
        if (currentHour >= 5 && currentHour < 12) {
            setGreet('Good Morning')
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreet('Good Afternoon')
        } else {
            setGreet('Good Evening')
        }
    }

    useEffect(() => {
        createGreet(); // 最初の実行
        const intervalId = setInterval(createGreet, 1000 * 60 * 60); // 1時間ごとに実行

        return () => {
            clearInterval(intervalId); // コンポーネントがアンマウントされるときにクリア
        };
    }, []);

    return (
        <div id="Greet" className="w-full h-full">
            <h1 className="font-extrabold text-4xl text-white px-[0] py-[5%]" >{greet}</h1>
        </div>
    )
}

export default Greet