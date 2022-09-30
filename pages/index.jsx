import Link from 'next/link';
import React from 'react';
import { ButtonComponent } from '../components/base_component';

const Index = () => {
  return (
    <div className='container mx-auto'>
      <h1 className="my-8">HELLO WORLD!</h1>

      <div className='flex flex-wrap gap-5'>
        <Link href="/component">
          <ButtonComponent label="Cek Input Component" bg={"primary"} />
        </Link>

        <Link href="/button-component">
          <ButtonComponent label="Cek Button Component" bg={"primary"} />
        </Link>

        <Link href="/other-component">
          <ButtonComponent label="Cek Other Component" bg={"primary"} />
        </Link>

        <Link href="/sidebar">
          <ButtonComponent label="Cek Sidebar" bg={"primary"} />
        </Link>

        <Link href="/table">
          <ButtonComponent label="Cek Table" bg={"primary"} />
        </Link>

        <Link href="/table-plus">
          <ButtonComponent label="Cek Table Plus" bg={"primary"} />
        </Link>

        <Link href="/table-crud">
          <ButtonComponent label="Cek Table Crud" bg={"primary"} />
        </Link>

        <Link href="/form">
          <ButtonComponent label="Cek Form" bg={"primary"} />
        </Link>
      </div>

    </div>
  );
}

export default Index;
