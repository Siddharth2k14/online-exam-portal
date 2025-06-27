import { Box, Typography, Link } from '@mui/material';
import './Footer.css';

const Footer = () => (
    <Box className="footer-container">
        <Box className="footer-row">
            {/* Left: Navigation Links */}
            <Box className="footer-left">
                <Typography className="footer-title" variant="h6">NAVIGATION LINKS</Typography>
                <Typography className="footer-link" variant="subtitle1">HOME</Typography>
                <Typography className="footer-link" variant="subtitle1">STUDENT LOGIN</Typography>
                <Typography className="footer-link" variant="subtitle1">ADMIN LOGIN</Typography>
                <Typography className="footer-link" variant="subtitle1">SIGNUP</Typography>
            </Box>

            {/* Right: Credits and Social */}
            <Box className="footer-right">
                <Typography className="footer-credits-title" variant="h6">Developer Credits</Typography>
                <Typography className="footer-credits" variant="subtitle1">
                    Built with <span className="footer-heart">❤️</span> by Siddharth Singh
                </Typography>
                <Typography className="footer-social" variant="subtitle1">
                    <Link href="https://github.com/Siddharth2k14" target="_blank" rel="noopener" underline="hover" color="inherit">
                        GitHub
                    </Link>
                    {' | '}
                    <Link href="https://www.linkedin.com/in/siddharth-singh-a2a822253/" target="_blank" rel="noopener" underline="hover" color="inherit">
                        LinkedIn
                    </Link>
                </Typography>
            </Box>
        </Box>
        {/* Disclaimer at the bottom */}
        <Box className="footer-disclaimer-bar">
            <Typography className="footer-disclaimer-title" variant="h6">Disclaimer</Typography>
            <Typography className="footer-disclaimer" variant="subtitle1">
                This is a student project for learning purposes
            </Typography>
        </Box>
    </Box>
);

export default Footer;
