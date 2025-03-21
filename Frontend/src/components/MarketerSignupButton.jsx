import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { MarketerSignupDialog } from "./Marketer";

export function MarketerSignupButton({ children, className }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className={className} onClick={() => setOpen(true)}>
        {children}
      </Button>

      <MarketerSignupDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

MarketerSignupButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
