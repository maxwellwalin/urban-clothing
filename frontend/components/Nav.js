import Link from 'next/link';
import NavStyles from '../components/styles/NavStyles'

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <Link href="/cart">Cart</Link>
    </NavStyles>
  );
}
