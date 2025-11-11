import { motion } from 'framer-motion'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <motion.footer
            className="py-8 bg-gray-100 dark:bg-gray-900 text-center text-gray-500 dark:text-gray-400 text-sm border-t dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <p>© {year} Expense Tracker — Built with ❤️ using React + TypeScript + Vite</p>
            <div className="flex justify-center mt-2">
                <img src="/vite.svg" alt="Vite Logo" className="w-8 opacity-80" />
            </div>
        </motion.footer>
    )
}

export default Footer
