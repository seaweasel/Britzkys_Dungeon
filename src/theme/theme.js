import { createTheme, responsiveFontSizes } from '@mui/material/styles'

const headerStyle = {
    fontFamily: 'UnifrakturCook, serif',
    border: '2px solid #c1121f',
    backgroundColor: 'rgb(120, 0, 0, 0.7)',
    position: 'relative',
    padding: '5px',
    borderRadius: '5px',
    color: '#fdf0d5',
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  };

const theme = createTheme({
    palette : {
        primary: {
            main: '#780000'
        },
        secondary: {
            main: '#003049'
        },
        info: {
            main: '#669bbc'
        },
        warning: {
            main: '#c1121f'
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 959, 
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontFamily: 'IM Fell English, serif',
        htmlFontSize: 12,
        h1: headerStyle,
        h2: headerStyle,
        h3: headerStyle,
        h4: headerStyle,
        h5: headerStyle,
        body1: {
            fontWeight: '700',
            color: '#fdf0d5',
        },
        body2: {
            fontWeight: '1200',
            color: '#fdf0d5',
        },  
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(/images/background.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed',
                    minHeight: '100vh',
                    margin: 0,
                    padding: 0,
                    overflowX: 'hidden',
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#003049',
                    borderRadius: '5px',
                    '& .MuiInputBase-input': {
                        color: '#fdf0d5',
                        '&:-webkit-autofill': {
                            transitionDelay: '9999s',
                            transitionProperty: 'background-color, color'
                        },
                    },    
                    '&.Mui-focused': {
                        border: 'none'
                    }        
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    border: '2px solid #669bbc',
                    '&.Mui-focused': {
                        border: 'none'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#669bbc'
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: '#fdf0d5'
                    }
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
              root: {
                fontFamily: 'IM Fell English, serif',
                color: '#fdf0d5',
                backgroundColor: '#780000',
                marginTop: '.5em',
                borderRadius: '5px',
               
            },
          },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    border: '2px solid #c1121f',
                }
            }
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    border: '2px solid #c1121f',
                }
            }
        },
        MuiCard :{
            styleOverrides: {
                root: {
                    border: '2px solid #669bbc',
                    backgroundColor: '#003049',
                    color: '#fdf0d5', 
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {

                    backgroundColor: '#003049',
                    color: '#fdf0d5',
                    border: '2px solid #669bbc',

                }
            }
        },
        MuiStep: {
            styleOverrides: {
              root: {
                // Add media queries for different screen sizes
                '& .MuiStepLabel-root.Mui-completed': {
                  color: '#c1121f',
                },
                '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                  color: '#c1121f',
                },
                '& .MuiStepLabel-root.Mui-active': {
                  color: '#c1121f',
                },
                '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                  color: '#c1121f',
                },
                '@media (max-width: 959px)': {
                  '& .MuiStepLabel-label': {
                    fontSize: '0.8rem',
                  },
                },
                '@media (max-width: 600px)': {
                  '& .MuiStepLabel-label': {
                    fontSize: '0.8rem',
                  },
                },
              },
            },
          },
    }
    })

      const responsiveTheme = responsiveFontSizes(theme);
      const combinedTheme = {
        ...responsiveTheme,
        ...theme,
      };

      
      export default combinedTheme;