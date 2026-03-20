export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer>
      <p>© {currentYear} Aves da Unesp - Câmpus Araraquara</p>
      <p>Fotos e desenvolvimento por Carlos Jr.</p>
    </footer>
  );
}
