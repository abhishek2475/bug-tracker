
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '../Login/LoginForm';
import { SignupForm } from '../SignUp/SignupForm'

interface AuthModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AuthModal({ isOpen, setIsOpen }: AuthModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <DialogHeader className="text-left mt-4">
              <DialogTitle>Login</DialogTitle>
              <DialogDescription>
                Welcome back! Please enter your details.
              </DialogDescription>
            </DialogHeader>
            <LoginForm />
          </TabsContent>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <DialogHeader className="text-left mt-4">
              <DialogTitle>Create an Account</DialogTitle>
              <DialogDescription>
                Get started by creating a new account.
              </DialogDescription>
            </DialogHeader>
            <SignupForm />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}