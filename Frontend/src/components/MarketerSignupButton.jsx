import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from "./ui/button";
import { MarketerSignupDialog } from './Marketer';

export function MarketerSignupButton({ className, children }) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setShowDialog(true)} 
        className={className}
      >
        {children}
      </Button>
      <MarketerSignupDialog 
        open={showDialog} 
        onOpenChange={setShowDialog}
      />
    </>
  );
}

MarketerSignupButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}; 