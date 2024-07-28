import icons from './icons'

const { MdOutlineLibraryMusic, FiDisc, HiOutlineChartPie, MdOutlineFeed } = icons
export const sidebarMenu = [
    {
        path: 'mymusic',
        text: 'Cá nhân',
        icon: <MdOutlineLibraryMusic size={24}/>
    },
    {
        path: '',
        text: 'Khám phá',
        icon: <FiDisc size={24}/>
    },
    {
        path: 'zing-chart',
        text: '#zingchart',
        icon: <HiOutlineChartPie size={24}/>
    },
    {
        path: 'follow',
        text: 'Theo dõi',
        icon: <MdOutlineFeed size={24}/>
    },
]

export const searchMenu = [
    {
        path: 'tat-ca',
        text: 'TẤT CẢ',
    },
    {
        path: 'bai-hat',
        text: 'BÀI HÁT',
    },
    {
        path: 'playlist',
        text: 'PLAYLIST/ALBUM',
    },
]