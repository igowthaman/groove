import { Link } from 'react-router';
import { BooksSvg, GuitarSvg, ProfileSVG, SearchSVG } from '~/assets/svg';

const pages = ['Search', 'Library', 'Profile'] as const;
const icons = {
  Search: <SearchSVG width={18} height={18} />,
  Library: <BooksSvg width={18} height={18} />,
  Profile: <ProfileSVG width={18} height={18} />,
};

function ResponsiveAppBar() {
  return (
    <div className="h-screen w-[50px] md:w-[150px] flex flex-col align-items-center bg-gray-900 text-white">
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-2 dark:text-red-400 p-3 justify-center md:justify-start"
      >
        <GuitarSvg />
        <span className="md:block hidden">Groove</span>
      </Link>
      <div className="mt-1 flex flex-col">
        {pages.map((page) => (
          <Link
            to={`/${page.toLowerCase()}`}
            key={page}
            className="font-bold flex items-center gap-2 button hover:text-red-400 hover:bg-gray-800 p-3 rounded justify-center transition-colors duration-200 md:justify-start"
          >
            {icons[page as keyof typeof icons]}
            <span className="md:block hidden">{page}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
