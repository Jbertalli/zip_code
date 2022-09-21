import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Header() {
    return (
        <>
            <Tabs>
                <Link href='/' passHref>
                    <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Home" />
                </Link>
                <Link href='/antinode_map' passHref>
                    <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="Antinode Map" />
                </Link>
                <Link href='/history' passHref>
                    <Tab style={{ color: 'white', fontSize: '25px', fontWeight: '400', textTransform: 'none' }} label="User Information" />
                </Link>
            </Tabs>
        </>
    );
}
