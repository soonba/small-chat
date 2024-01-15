// TODO: Remove Dummy
export default function OpponentChat() {
    return (
        <div className="mr-auto w-max">
            <div className="flex items-center gap-x-2.5">
                <img src="https://picsum.photos/40" width={40} height={40} alt="" className="h-10 w-10 rounded-lg border border-blue-gray-100" />
                <p className="text-sm font-bold">닉네임</p>
            </div>
            <div className="flex items-end gap-x-2.5">
                <div className="ml-[50px] min-w-80 max-w-md whitespace-pre-wrap break-all rounded-3xl rounded-tl-none bg-blue-gray-50 p-5 text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper fringilla eros, at porttitor urna. Nullam pharetra feugiat mauris nec luctus. Suspendisse eget lobortis
                    sapien. Sed molestie turpis nisi, efficitur pulvinar turpis bibendum efficitur. Maecenas diam dui, accumsan sit amet scelerisque aliquam, porta ut enim. Nulla a iaculis augue.
                    Vestibulum laoreet augue eget sem rhoncus, eget efficitur leo maximus. Morbi vel enim arcu. Duis vulputate semper mauris lacinia rhoncus. Nulla facilisi. Donec eget sagittis
                    ligula, vel lobortis sem. Donec hendrerit vehicula tellus quis cursus. Suspendisse gravida porta malesuada. In pellentesque bibendum nunc, quis placerat quam ultricies ut. In ipsum
                    nibh, aliquam non quam ut, dapibus pulvinar eros.
                </div>
                <time className="text-xs font-semibold">11:01</time>
            </div>
        </div>
    );
}
