import {
  Accordion,
  AccordionSummary,
  Grid,
  Stack,
  Typography,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionItemProps {
  title: React.ReactNode;
  subTitle?: string;
  expanded: boolean;
  actionIcon?: React.ReactNode;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subTitle,
  expanded,
  onChange,
  children,
  disabled,
}) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      disabled={disabled}
      sx={{
        width: "100% !important",
        backgroundColor: "rgb(255, 255, 255)",
        boxShadow: "none",
        borderRadius: 2,
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${title}-content`}
        id={`${title}-header`}
        sx={{ borderRadius: 2 }}
      >
        <Grid container direction="row" justifyContent="space-between">
          <Stack direction="column" spacing={0.5}>
            <Typography
              variant="h5"
              display="flex"
              alignItems="center"
              fontWeight="fontWeightMedium"
              sx={{
                fontSize: "14px",
                fontFamily: 'var(--font-geist-mono)',
              }}
            >
              {title}
            </Typography>
            {subTitle && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontSize: "14px",
                  fontFamily: 'var(--font-geist-mono)',
                }}
              >
                {subTitle}
              </Typography>
            )}
          </Stack>
        </Grid>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          px: 0,
          ...(disabled && {
            pointerEvents: "none",
            opacity: 0.7,
          }),
        }}
      >
        {expanded && children}
      </AccordionDetails>
    </Accordion>
  );
};

export default AccordionItem;
