const blue: Record<number, string> = {
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

const pink: Record<number, string> = {
  50: '#fff1f3',
  100: '#ffe3e8',
  200: '#ffb7c5',
  300: '#ffa2b5',
  400: '#fe6e8d',
  500: '#f83b6a',
  600: '#e51955',
  700: '#c20e47',
  800: '#a20f43',
  900: '#8a113f',
  950: '#4d041d',
};

const background: Record<string, Record<string, string>> = {
  background: {
    dark: '#0e0e11',
    light: '#ffffff',
  },
  layout: {
    dark: '#02101c',
    light: '#f7fbff',
  },
  main: {
    dark: '#0000001a',
    light: '#f0f8ff1a',
  },
};

const gradient: Record<string, Record<string, string>> = {
  spring: {
    light: 'linear-gradient(#ffb7c5, #ffffff)',
    dark: 'linear-gradient(#000000 20%, #ffb7c5)',
  },
  winter: {
    light: 'linear-gradient(#0c436e, #e5e7eb)',
    dark: 'linear-gradient(#000000 20%, #0c436e)',
  },
};

export default function Color() {
  return (
    <div>
      <h2 className="mb-10 text-30-B-36" id="color">
        Color
      </h2>
      <div className="space-y-5 rounded">
        <h3 className="text-16-B-24 text-black">Spring Theme</h3>
        <ul className="flex w-full flex-wrap items-center gap-5">
          {Object.keys(pink).map((key) => (
            <li key={key} className="w-36">
              <div className="h-14 w-full border border-black" style={{ backgroundColor: pink[Number(key)] }} />
              <p className="font-jua text-14-B-20">
                <small className="font-inherit">{key}</small>
                <br />
                {pink[Number(key)]}
              </p>
            </li>
          ))}
        </ul>
        <h3 className="text-16-B-24 text-black">Winter Theme</h3>
        <ul className="flex w-full flex-wrap items-center gap-5">
          {Object.keys(blue).map((key) => (
            <li key={key} className="w-36">
              <div className="h-14 w-full border border-black" style={{ backgroundColor: blue[Number(key)] }} />
              <p className="font-jua text-14-B-20">
                <small className="font-inherit">{key}</small>
                <br />
                {blue[Number(key)]}
              </p>
            </li>
          ))}
        </ul>
        <h3 className="text-16-B-24 text-black">Layouts</h3>
        <ul className="flex w-full flex-wrap items-center gap-5">
          {Object.keys(background).map((color) => (
            <li key={color} className="w-full">
              <ul className="flex w-full flex-wrap items-center gap-5">
                {Object.keys(background[color]).map((key) => (
                  <li key={key} className="w-36">
                    <div
                      className="h-14 w-full border border-black"
                      style={{
                        background: background[color][key],
                      }}
                    />
                    <p className="font-jua text-14-B-20">
                      <small className="font-inherit capitalize">
                        {color} - {key}
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
        <h3 className="text-16-B-24 text-black">Gradient</h3>
        <ul className="flex w-full flex-wrap items-center gap-5">
          {Object.keys(gradient).map((color) => (
            <li key={color} className="w-full">
              <ul className="flex w-full flex-wrap items-center gap-5">
                {Object.keys(gradient[color]).map((key) => (
                  <li key={key} className="w-36">
                    <div
                      className="h-14 w-full border border-black"
                      style={{
                        background: gradient[color][key],
                      }}
                    />
                    <p className="font-jua text-14-B-20">
                      <small className="font-inherit capitalize">
                        {color} - {key}
                      </small>
                      <br />
                      {gradient[color][key]}
                    </p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
