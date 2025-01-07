const primary: Record<number, string> = {
  100: '#e0f0fe',
  200: '#bae2fd',
  300: '#7dcbfc',
  400: '#38b0f8',
  50: '#f0f8ff',
  500: '#0e96e9',
  600: '#0277c7',
  700: '#035ea1',
  800: '#075185',
  900: '#0c436e',
  950: '#082b49',
};

const background: Record<string, Record<string, string>> = {
  background: {
    dark: '#0e0e11',
    light: '#ffffff',
  },
  'layout @components': {
    dark: '#02101c',
    light: '#f7fbff',
  },
  main: {
    dark: '#0000001a',
    light: '#f0f8ff1a',
  },
};

export default function Color() {
  return (
    <section className="scroll-m-16 drop-shadow-lg text-shadow dark:text-shadow-unset" id="color">
      <h2 className="mb-10 text-30-B-36" id="color">
        Color
      </h2>
      <div className="space-y-5 rounded bg-transparent">
        <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">Primary</h3>
        <ul className="flex w-full flex-wrap items-center gap-5">
          {Object.keys(primary).map((key) => (
            <li key={key} className="w-full md:max-w-36">
              <div className="h-14 w-full" style={{ backgroundColor: primary[Number(key)] }} />
              <p className="font-jua text-14-B-20">
                <small className="font-inherit">{key}</small>
                <br />
                {primary[Number(key)]}
              </p>
            </li>
          ))}
        </ul>
        <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">Layouts</h3>
        <ul className="flex w-full flex-wrap items-center gap-5">
          {Object.keys(background).map((color) => (
            <li key={color} className="w-full">
              <ul className="flex w-full flex-wrap items-center gap-5">
                {Object.keys(background[color]).map((key) => (
                  <li key={key} className="w-full md:max-w-36">
                    <div
                      className="h-14 w-full"
                      style={{
                        backgroundColor: background[color][key],
                        border: key === 'light' ? '1px solid black' : 'none',
                      }}
                    />
                    <p className="font-jua text-14-B-20">
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
        <h3 className="text-16-B-24 text-gray-50 dark:text-gray-100">Text</h3>
        <ul className="flex w-full flex-wrap items-center gap-5">
          <li className="w-full md:max-w-36">
            <div className="h-14 w-full" style={{ backgroundColor: primary[900] }} />
            <p className="font-jua text-14-B-20">
              <small className="font-inherit">Light</small>
              <br />
              {primary[900]}
            </p>
          </li>
          <li className="w-full md:max-w-36">
            <div className="h-14 w-full" style={{ backgroundColor: primary[900], opacity: 0.5 }} />
            <p className="font-jua text-14-B-20">
              <small className="font-inherit">Light / 50%</small>
              <br />
              {primary[900]}, opacity 50
            </p>
          </li>
          <li className="w-full md:max-w-36">
            <div className="h-14 w-full" style={{ backgroundColor: primary[100] }} />
            <p className="font-jua text-14-B-20">
              <small className="font-inherit">Dark</small>
              <br />
              {primary[100]}
            </p>
          </li>
          <li className="w-full md:max-w-36">
            <div className="h-14 w-full" style={{ backgroundColor: primary[100], opacity: 0.5 }} />
            <p className="font-jua text-14-B-20">
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
