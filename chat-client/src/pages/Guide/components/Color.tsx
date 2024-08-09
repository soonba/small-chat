const primary: Record<number, string> = {
    50: '#f0f8ff',
    100: '#e0f0fe',
    200: '#bae2fd',
    300: '#7dcbfc',
    400: '#38b0f8',
    500: '#0e96e9',
    600: '#0277c7',
    700: '#035ea1',
    800: '#075185',
    900: '#0c436e',
    950: '#082b49'
};

const background: Record<string, Record<string, string>> = {
    background: {
        dark: '#0e0e11',
        light: '#ffffff'
    },
    main: {
        dark: '#0000001a',
        light: '#f0f8ff1a'
    },
    'layout components': {
        dark: '#02101c',
        light: '#f7fbff'
    }
};

export default function Color() {
    return (
        <section id="color" className="scroll-m-16 text-primary-900 dark:text-primary-100">
            <h2 className="text-30-B-36 mb-10">Color</h2>
            <div className="dark:bg-layout-dark bg-layout-light space-y-5 rounded p-5 shadow-md shadow-primary-100 dark:shadow-primary-950">
                <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">Primary</h3>
                <ul className="flex w-full items-center gap-x-5 rounded">
                    {Object.keys(primary).map((key) => (
                        <li key={key} className="w-full">
                            <div style={{ backgroundColor: primary[Number(key)] }} className="h-14 w-full" />
                            <p className="text-14-B-20 font-jua">
                                <small className="font-inherit">{key}</small>
                                <br />
                                {primary[Number(key)]}
                            </p>
                        </li>
                    ))}
                </ul>
                <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">Layouts</h3>
                <ul className="space-y-5">
                    {Object.keys(background).map((color) => (
                        <li key={color} className="w-full">
                            <ul className="flex w-full items-center gap-x-5 rounded">
                                {Object.keys(background[color]).map((key) => (
                                    <li key={key} className="w-full max-w-36">
                                        <div
                                            style={{
                                                backgroundColor: background[color][key],
                                                border: key === 'light' ? '1px solid black' : 'none'
                                            }}
                                            className="h-14 w-full"
                                        />
                                        <p className="text-14-B-20 font-jua">
                                            <small className="font-inherit">
                                                <span className="capitalize">{color}</span> - {key}
                                            </small>
                                            <br />
                                            {background[color][key]}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <h3 className="text-16-B-24 text-gray-900 dark:text-gray-100">Text</h3>
                <ul className="flex w-full items-center gap-x-5 rounded">
                    <li className="w-full max-w-36">
                        <div style={{ backgroundColor: primary[900] }} className="h-14 w-full" />
                        <p className="text-14-B-20 font-jua">
                            <small className="font-inherit">Light</small>
                            <br />
                            {primary[900]}
                        </p>
                    </li>
                    <li className="w-full max-w-36">
                        <div style={{ backgroundColor: primary[900], opacity: 0.5 }} className="h-14 w-full" />
                        <p className="text-14-B-20 font-jua">
                            <small className="font-inherit">Light / 50%</small>
                            <br />
                            {primary[900]}, opacity 50
                        </p>
                    </li>
                    <li className="w-full max-w-36">
                        <div style={{ backgroundColor: primary[100] }} className="h-14 w-full" />
                        <p className="text-14-B-20 font-jua">
                            <small className="font-inherit">Dark</small>
                            <br />
                            {primary[100]}
                        </p>
                    </li>
                    <li className="w-full max-w-36">
                        <div style={{ backgroundColor: primary[100], opacity: 0.5 }} className="h-14 w-full" />
                        <p className="text-14-B-20 font-jua">
                            <small className="font-inherit">Dark / 50%</small>
                            <br />
                            {primary[100]}, opacity 50
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
