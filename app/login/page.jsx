'use client';

import api from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/useAuthStore';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { useState } from 'react';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoginError('');
      const response = await api.post('v3/users/authenticate', {
        username: data.username,
        password: data.password,
        domain: 'spa.radshid.com',
      });
      const token = response.data.token;
      if (token) {
        login({ token, userInfo: response.data });
        router.push('/dashboard');
      }
    } catch (err) {
      if (err.status === 401)
        setLoginError(t('login.invalidCredentials'));
    }
  };


  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h5" align="center" color="black">
          {t("login.welcome")}
        </Typography>

        {loginError && <Alert severity="error">{loginError}</Alert>}

        <TextField
          label={t("username")}
          variant="outlined"
          fullWidth
          {...register('username', { required: t('login.username_required') })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          label={t("password")}
          type="password"
          variant="outlined"
          fullWidth
          {...register('password', { required: t('login.password_required') })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" type="submit" sx={{ flex: 2 }}>
            {t("login.login")}
          </Button>
          <LanguageSwitcher sx={{ flex: 1 }} />
        </Box>
      </Box>
    </Container>
  );
}
