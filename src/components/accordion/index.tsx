import { SyntheticEvent, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {
    Grid,
    Accordion as MaterialAccordion,
    Typography,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material'

import useStyles from 'theme/useStylesAccordion'

interface AccordionProps {
    accordions: { title: string, subtitle?: string, icon: JSX.Element, content: JSX.Element }[]
    indexOpen?: number
}

export default function Accordion(props: AccordionProps): JSX.Element {
    const { accordions, indexOpen = -1 } = props

    const classes = useStyles()
    const [expanded, setExpanded] = useState<number | boolean>(indexOpen >= 0 ? indexOpen : false)

    const handleChange = (panel: number) => (event: SyntheticEvent<Element, Event>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false)
    }

    return (
        <>
            {accordions.map((element, index: number) => (
                <MaterialAccordion
                    key={index}
                    expanded={expanded === index}
                    onChange={handleChange(index)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${index}bh-content`}
                        id={`${index}bh-header`}
                    >
                        {element.icon}
                        <Typography className={classes.heading}>
                            {element.title}
                        </Typography>
                        <Typography className={classes.secondaryHeading}>
                            {element.subtitle}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={12} sm={12} lg={12}>
                                {element.content}
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </MaterialAccordion>
            ))}
        </>
    )
}