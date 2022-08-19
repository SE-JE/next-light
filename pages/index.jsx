import Link from 'next/link';
import React from 'react';
import { ButtonComponent } from '../components/base_component';

const Index = () => {
  return (
    <div className='container mx-auto'>
      <h1 className="my-8">HELLO WORLD!</h1>

      <Link href="/component">
        <ButtonComponent label="Cek Input Component" bg={"primary"} />
      </Link>
    </div>
  );
}

export default Index;
