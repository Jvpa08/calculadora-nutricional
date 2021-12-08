import React from 'react'
import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p style={{fontWeight: 'bold'}}>Desenvolvido por:</p>
            <p style={{paddingLeft: '5px'}}> João Victor Pereira de Andrade</p>
        </footer>
    )
}
 